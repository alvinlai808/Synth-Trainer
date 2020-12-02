import React from "react";
import * as Tone from "tone";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "../Keyboard.css";

const Keyboard = ({ playTone }) => {
  const keyboardWidth = 1100;
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  return (
    <Piano
      className="PianoDarkTheme"
      keyWidthToHeight = {.3}
      noteRange={{ first: firstNote, last: lastNote }}
      width={keyboardWidth}
      keyboardShortcuts={keyboardShortcuts}
      playNote={(midiNumber) => {
        playTone(Tone.Midi(midiNumber).toFrequency());
      }}
      stopNote={(midiNumber) => {
        // Function used to stop a note (might be useful for noise gating).
        // Not using it atm, but it has to be defined -Andrey
      }}
    />
  );
};

export default Keyboard;
