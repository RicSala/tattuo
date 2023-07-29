'use client'

import { useState } from "react";
import MultiStep from "./MultiStep";
import ListingGrid from "../listings/ListingGrid";
import ArtistCard from "../listings/ArtistCard";

export default function MultiStepWithResults(props) {

    const [profileMatches, setProfileMatches] = useState(null);

    if (!profileMatches) return (
        <MultiStep setResults={setProfileMatches} />
    );

    return (
        <ListingGrid>
            {profileMatches.map((profile) => (
                <ArtistCard
                    key={profile.id}
                    data={profile}
                />
            ))}

        </ListingGrid>
    )
}