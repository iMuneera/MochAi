"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, Card, Typography, 
  CircularProgress, Alert, Grid,
  Divider, List, ListItem, ListItemText,
  ListItemButton, Paper
} from '@mui/material';
import { format } from 'date-fns';

export default function PlanNote({ params }) {
    const { studyplanid, noteid } = params;
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_notes/${studyplanid}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data);
                
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
        return format(new Date(dateString), 'MMM d, yyyy');
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            height: 'calc(100vh - 64px)',
            p: 2,
            gap: 2
        }}>
            {/* Notes List */}
            <Paper elevation={1} sx={{ 
                width: 300, 
                height: '100%',
                overflow: 'auto',
                borderRadius: 2
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                    </Typography>
                </Box>
                <Divider />
                <List>
                    {notes.length > 0 ? (
                        notes.map(note => (
                            <ListItem 
                                key={note.id} 
                                disablePadding
                                sx={{
                                    bgcolor: selectedNote?.id === note.id ? 'action.selected' : 'inherit'
                                }}
                            >
                                <ListItemButton
                                    selected={selectedNote?.id === note.id}
                                    onClick={() => setSelectedNote(note)}
                               
                                    component="a"
                                >
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={500}>
                                                {note.title || 'Untitled Note'}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    noWrap
                                                >
                                                    {note.content.substring(0, 50)}
                                                    {note.content.length > 50 ? '...' : ''}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {formatDate(note.created_at)}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <Box sx={{ p: 2 }}>
                            <Alert severity="info">No notes found</Alert>
                        </Box>
                    )}
                </List>
            </Paper>

            <Paper elevation={1} sx={{ 
                flex: 1, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2
            }}>
                {selectedNote ? (
                    <>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                {selectedNote.title || 'Untitled Note'}
                            </Typography>
                            <Typography color="text.secondary">
                                Created: {formatDate(selectedNote.created_at)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ 
                            p: 3, 
                            flex: 1,
                            overflow: 'auto'
                        }}>
                            <Typography variant="body1" whiteSpace="pre-wrap">
                                {selectedNote.content}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                    }}>
                        <Typography color="text.secondary">
                            {notes.length > 0 ? 'Select a note to view' : 'No notes available'}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}