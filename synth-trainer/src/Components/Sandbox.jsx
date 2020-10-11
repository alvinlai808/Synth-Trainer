import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone'
import {
    Button, 
    InputGroup,
    FormControl,
} from "react-bootstrap";

const playTone = () => {
    const synth = new Tone.MonoSynth({
        oscillator: {
            type: "square"
        },
        envelope: {
            attack: 0.1,
            decay: 1,
            release: 1
        }
    }).toDestination();
    synth.triggerAttackRelease("C4", "8n");
}

const Sandbox = () => {
    return (
        <div>
            <h1>Sandbox</h1>
            <Button onClick={(event) => {playTone();}}>
                Hello, Tone!
            </Button>
        </div>
    );
}
export default Sandbox;

// const Sandbox = () => {
//     // const [isLoaded, setLoaded] = useState(false);
//     const synth = useRef(null);
//     const [attack, setAttack] = useState(0.1);
//     const [decay, setDecay] = useState(1);
//     const [release, setRelease] = useState(1);

//     useEffect(() => {
//         synth.current = new Tone.MonoSynth({
//             oscillator: {
//                 type: "square"
//             },
//             envelope: {
//                 attack: {attack},
//                 decay: 1,
//                 release: 1
//             }
//         }).toDestination();
//     }, []);

//     const attackHandler = (event) => {
//         const {value} = event.currentTarget;
//         synth.envelope.attack = setAttack(value);
//     }

//     const decayHandler = (event) => {
//         const {decay, value} = event.currentTarget;
//         setDecay(value);
//     }

//     const releaseHandler = (event) => {
//         const {attack, value} = event.currentTarget;
//         setRelease(value);
//     }

//     const handleClick = () => synth.current.triggerAttackRelease("C4", "8n");

//     return (
//         <div>
//             <Button onClick={handleClick}>
//                 start
//             </Button>
//             <InputGroup className="mb-3" controlId="formAttack">
//                 <InputGroup.Prepend>
//                     <InputGroup.Text>Attack</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <FormControl 
//                     type="attack"
//                     name="synthAttack"
//                     value={attack}
//                     placeholder="Attack Time (ms)"
//                     id="synthAttack"
//                     onChange={(event) => attackHandler(event)}
//                 />
//             </InputGroup>

//         </div>
//     )
// }
// export default Sandbox;