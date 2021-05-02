import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "../Jokes.module.scss";
import JokeCategory from "./JokeCategory";
import BlacklistCategory from "./BlacklistCategory";
import AmountOfJokes from "./AmountOfJokes";
import Language from "./Language";

export default function SettingsAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <h2>Settings</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.settings}>
            <div className={styles.categories}>
              <JokeCategory />
              <BlacklistCategory />
            </div>
            <div className={styles.rightSideDropdowns}>
              <div className={styles.jokeLanguage}>
                <Language />
              </div>
              <AmountOfJokes />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
