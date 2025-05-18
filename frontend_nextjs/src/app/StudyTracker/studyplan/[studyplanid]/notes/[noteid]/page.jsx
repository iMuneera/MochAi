"use client";

import { useState, useEffect } from 'react';

export default function PlanNote({ params }) {
    const { studyplanid, noteid } = params;

    return (
        <div>
            <p>Study Plan ID: {studyplanid}</p>
            <p>Note ID: {noteid}</p>
        </div>
    );
}