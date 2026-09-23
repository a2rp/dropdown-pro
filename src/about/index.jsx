import React from "react";
import { Styled } from "./styled";

const About = () => (
    <Styled.Wrapper>
        <Styled.Main>
            <h1>About Me</h1>
            <p>
                I'm Ashish Ranjan, a full-stack JavaScript developer based in
                Bengaluru, India. I build fast frontends, dependable APIs, and
                practical product experiences.
            </p>
            <p>
                My main tools include React, Vite, Node, Express, MongoDB,
                styled-components, and GitHub-based deployment workflows.
            </p>
            <h3>What I bring</h3>
            <ul>
                <li>Scalable component systems with clear documentation</li>
                <li>Clean, validated backend routes and predictable APIs</li>
                <li>Reliable release workflows and accessibility checks</li>
            </ul>
            <h3>Contact</h3>
            <ul>
                <li>Email: ash.ranjan09@gmail.com</li>
                <li>Portfolio: https://www.ashishranjan.net</li>
                <li>GitHub: https://github.com/a2rp</li>
                <li>LinkedIn: https://www.linkedin.com/in/aashishranjan/</li>
            </ul>
        </Styled.Main>
    </Styled.Wrapper>
);

export default About;
