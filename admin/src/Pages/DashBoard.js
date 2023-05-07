import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

function DashBoard() {
  return (
    <div>
      <Typography variant="body1" component="p" align="center">
        Dashboard
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>

      <div>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/page2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DashBoard;
