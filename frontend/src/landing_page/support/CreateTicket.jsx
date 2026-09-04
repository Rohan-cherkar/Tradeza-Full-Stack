import React from "react";
import Dropdown from "./Dropdown.jsx";
function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5  mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1><br /><br /><br />
        <div className="col-6 ms-5 ps-5"><Dropdown
          heading="Account Opening"
          points={[
            "Resident individual",
            "Minor",
            "Non Resident Indian (NRI)",
            "Company",
            " Partnership HUF and LLP",
            "Glossary",
          ]}
        />
        <Dropdown
          heading="Your Zerodha Account"
          points={[
            "Your Profile",
            "Account modification",
            "Client Master Report (CMR) and Depository Participant (DP)",
            " Nomination",
            "Transfer and conversion of securities",
          ]}
        />
        <Dropdown
          heading="Kite"
          points={[
            "IPO",
            "Trading FAQs",
            "Margin Trading Facility (MTF) and Margins",
            "Charts and orders",
            "Alerts and Nudges",
            "General",
          ]}
        /></div>
        <div className="col-5"><Dropdown
          heading="Funds"
          points={[
            "Add money",
            "Withdraw money",
            " Add bank accounts",
            "eMandates",
          ]}
        />
        <Dropdown
          heading="Console"
          points={[
            "Portfolio",
            "Corporate actions",
            "Funds statement",
            "Reports",
            "Profile",
            "Segments",
          ]}
        />
        <Dropdown
          heading="Coin"
          points={[
            "Mutual funds",
            "National Pension Scheme (NPS)",
            "Fixed Deposit (FD)",
            "Features on Coin",
            "Payments and Orders",
            "General",
          ]}/></div>
        

        
        
      </div>
    </div>
  );
}

export default CreateTicket;
