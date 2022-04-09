CREATE TABLE IF NOT EXISTS teams (
    id        INTEGER PRIMARY KEY,
    pulseId   INTEGER,
    optaId    TEXT,
    name      TEXT,
    shortName TEXT
);

CREATE TABLE IF NOT EXISTS players (
    id           INTEGER PRIMARY KEY,
    pulseId      INTEGER,
    optaId       TEXT,
    firstName    TEXT,
    lastName     TEXT,
    dateOfBirth  DATETIME,
    countryCode  TEXT,
    countryName  TEXT,
    positionCode TEXT,
    positionName TEXT,
    sticker      TEXT
);

CREATE TABLE IF NOT EXISTS squads (
    seasonId    INTEGER,
    teamId      INTEGER,
    playerId    INTEGER,
    appearances INTEGER,
    cleanSheets INTEGER,
    goals       INTEGER
);

CREATE INDEX IF NOT EXISTS squads_lookups
ON squads (seasonId, teamId, playerId);
