import React from "react";

const Footer = props => {
  return (
    <footer style={{ backgroundColor: "#ffaa00" }}>
      <div>
        <h5>About</h5>
        <span>
          Code:{" "}
          <a
            href="https://github.com/jackdbd/dataviz-challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            repo on GitHub
          </a>
        </span>

        <br />
        <span>
          Me:{" "}
          <a
            href="https://twitter.com/jackdbd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <span> / </span>
          <a
            href="https://www.linkedin.com/in/giacomodebidda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <span> / </span>
          <a
            href="https://www.giacomodebidda.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </span>

        <h5>Built with</h5>
        <ul>
          <li>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </li>
          <li>
            <a
              href="https://d3js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              D3
            </a>
          </li>
          <li>
            <a
              href="https://vx-demo.now.sh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              vx
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
