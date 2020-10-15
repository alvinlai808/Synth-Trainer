import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone'
import {
  Button, 
  Card,
  Form,
  FormControl,
  InputGroup
} from "react-bootstrap";


const Sandbox = () => {
  const [attackEnvelope, setAttackEnvelope] = useState(0.0);


  const playTone = () => {
    const synth = new Tone.MonoSynth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: attackEnvelope,
        decay: 1,
        release: 1
      }
    }).toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }

  const buttonClickHandler = (event) => {
    const { name } = event.currentTarget;
    if (name === "attackButton") {
      setAttackEnvelope(attackEnvelope + 1);
    }
  }


  return (
    <div className="col-sm-12 my-auto">
      <h1 className="text-3xl mb-2 text-center font-bold">Sandbox</h1>
      <Card id="sandbox-card" className="text-center w-center">
        <Card.Title id="sandbox-label">*Insert Synth Type*</Card.Title>
        <Form>
          <Button onClick={(event) => {playTone();}}>
            Hello, Tone!
          </Button>
          <Button name="attackButton" onClick={(event) => buttonClickHandler(event)}>Change Attack</Button>
        </Form>
      </Card>
    </div>
  );
}
export default Sandbox;

// const Sandbox = () => {
//   // const [isLoaded, setLoaded] = useState(false);
//   const synth = useRef(null);
//   const [attack, setAttack] = useState(0.1);
//   const [decay, setDecay] = useState(1);
//   const [release, setRelease] = useState(1);

//   useEffect(() => {
//     synth.current = new Tone.MonoSynth({
//       oscillator: {
//         type: "square"
//       },
//       envelope: {
//         attack: {attack},
//         decay: 1,
//         release: 1
//       }
//     }).toDestination();
//   }, []);

//   const userSubmittedAttack = (event, attack) => {
//     setAttack(attack);
//   }

//   const attackHandler = (event) => {
//     const {value} = event.currentTarget;
//     // synth.envelope.attack = setAttack(value);
//   }

//   const decayHandler = (event) => {
//     const {decay, value} = event.currentTarget;
//     setDecay(value);
//   }

//   const releaseHandler = (event) => {
//     const {attack, value} = event.currentTarget;
//     setRelease(value);
//   }

//   const handleClick = () => synth.current.triggerAttackRelease("C4", "8n");

//   return (
//     <div>
//       <Button onClick={handleClick}>
//         start
//       </Button>
//       {/* <Form attack={attack} setAttack={setAttack}/> */}
//       <InputGroup className="mb-3" controlId="formAttack">
//         <InputGroup.Prepend>
//           <InputGroup.Text>Attack</InputGroup.Text>
//         </InputGroup.Prepend>
//         <FormControl 
//           type="attack"
//           name="synthAttack"
//           value={attack}
//           placeholder="Attack Time (ms)"
//           id="synthAttack"
//           onChange={(event) => attackHandler(event)}
//         />
//       </InputGroup>
//       <Button
//         onClick={(event) => {
//           userSubmittedAttack(event, attack)
//         }}
//       >
//         Submit Attack Value
//       </Button>
//     </div>
//   )
// }
// export default Sandbox;