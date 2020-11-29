import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import {
  getInProgressModules,
  getAllModules,
  removeInProgressModule,
} from "../firebase.js";
import { UserContext } from "../providers/UserProvider.jsx";

const HomePage = () => {
  const user = useContext(UserContext);
  const allModules = getAllModules();

  const [inProgressModules, setInProgressModules] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getInProgressModules(user);

      setInProgressModules(result);
    };

    fetchData();
  }, []);

  const handleButton = async (event) => {
    const { name, id } = event.currentTarget;
    switch (name) {
      case "abandonModule":
        const result = await removeInProgressModule(user, id);
        setInProgressModules(result);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>UNDER CONSTRUCTION</h1>
      <h2>Modules In Progress</h2>
      {inProgressModules.map((module) => {
        if (module.name !== undefined) {
          return (
            <Card bg="info" key={module.name}>
              <Card.Title>
                {module.name.split(/(?=[A-Z])/).join(" ")}
              </Card.Title>
              <Card.Body>
                <p>First Accessed: {module.firstAccess.toDate().toString()}</p>
                <p>Last Accessed: {module.recentAccess.toDate().toString()}</p>
                <Button id={module} name="abandonModule" onClick={handleButton}>
                  Abandon Module
                </Button>
              </Card.Body>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default HomePage;
