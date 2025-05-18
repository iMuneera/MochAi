"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Box, Card, CardContent, Typography, 
  CircularProgress, Alert, Grid
} from '@mui/material';

export default function PlanNote({ params }) {
    const { studyplanid, noteid } = params;
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_note/${studyplanid}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data);
                
                // If there's a noteid in URL, find that note, otherwise select first
                const noteToSelect = noteid 
                    ? data.find(note => note.id.toString() === noteid.toString())
                    : data[0];
                
                if (noteToSelect) {
                    setSelectedNote(noteToSelect);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [studyplanid, noteid]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Grid container spacing={3} sx={{ p: 3 }}>
            {/* Notes List Sidebar */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            All Notes
                        </Typography>
                        <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            {notes.length > 0 ? (
                                notes.map(note => (
                                    
                                    <Card 

                                        key={note.id}
                                        sx={{ 
                                            mb: 2,
                                            cursor: 'pointer',
                                            backgroundColor: selectedNote?.id === note.id ? 'action.selected' : 'background.paper',
                                            '&:hover': {
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                        onClick={() => setSelectedNote(note)}
                                    >

                                        <CardContent>
                                            <a href={`/StudyTracker/studyplan/${studyplanid}/notes/${note.id}`}>
                                            <Typography variant="subtitle1">{note.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {note.content}
                                            </Typography>
                                            <Typography variant="caption" display="block">
                                                {formatDate(note.created_at)}
                                            </Typography>
                                            </a>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Alert severity="info">No notes found for this study plan</Alert>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

     
        </Grid>
    );
}