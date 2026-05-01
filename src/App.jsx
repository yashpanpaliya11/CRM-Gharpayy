import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LeadsList from './pages/LeadsList';
import AddLead from './pages/AddLead';
import Pipeline from './pages/Pipeline';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'leads'), (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddLead = async (newLead) => {
    try {
      const initialTimeline = [{
        action: "Lead Created",
        time: new Date().toISOString()
      }];
      await addDoc(collection(db, 'leads'), { ...newLead, timeline: initialTimeline });
    } catch (error) {
      console.error("Error adding lead: ", error);
      alert("Failed to add lead. Make sure Firebase permissions allow writes.");
      throw error;
    }
  };

  const handleUpdateLead = async (id, updatedFields) => {
    try {
      let actionText = "Lead updated";
      if (updatedFields.status) actionText = `Status changed to ${updatedFields.status}`;
      else if (updatedFields.assignedTo) actionText = `Assigned to ${updatedFields.assignedTo}`;
      else if (updatedFields.visitDate) actionText = `Visit Scheduled for ${new Date(updatedFields.visitDate).toLocaleDateString()}`;

      const timelineEvent = {
        action: actionText,
        time: new Date().toISOString()
      };

      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        ...updatedFields,
        timeline: arrayUnion(timelineEvent)
      });
    } catch (error) {
      console.error("Error updating lead: ", error);
      alert("Failed to update lead.");
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'leads', id));
      } catch (error) {
        console.error("Error deleting lead: ", error);
        alert("Failed to delete lead.");
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    const searchLower = searchQuery.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.phone?.toLowerCase().includes(searchLower) ||
      lead.status?.toLowerCase().includes(searchLower) ||
      lead.assignedTo?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2d3436' }}>Loading CRM Data...</div>;
  }

  return (
    <BrowserRouter>
      <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard leads={leads} />} />
          <Route path="/leads" element={<LeadsList leads={filteredLeads} onUpdateLead={handleUpdateLead} onDeleteLead={handleDeleteLead} />} />
          <Route path="/pipeline" element={<Pipeline leads={filteredLeads} onUpdateLead={handleUpdateLead} />} />
          <Route path="/add-lead" element={<AddLead onAddLead={handleAddLead} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
