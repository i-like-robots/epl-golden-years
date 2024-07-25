import React from "react";

export default function PlayerCard({seasonId, player}) {
    return (
        <div>
            <h3>{player.playerId}</h3>
            <p>Season: {seasonId}</p>
            <p>Appearances: {player.appearances}</p>
            <p>Clean Sheets: {player.cleanSheets}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
        </div>
    );
}