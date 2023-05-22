import React from "react";
import "./DataSection.css";

const ClosedDisputes = () => {
  const publications = [
    {
      id: 1,
      createdBy: "John Doe",
      Title: "Title 1",
      description: "Open Source Organization",
    },
    {
      id: 2,
      createdBy: "Jane Doe",
      Title: "Title 2",
      description: "Another Open Source Organization",
    },
    {
      id: 3,
      createdBy: "Bob Smith",
      Title: "Title 3",
      description: "Third Open Source Organization",
    },
    {
      id: 4,
      createdBy: "Samantha Lee",
      Title: "Title 4",
      description: "Yet Another Open Source Organization",
    },
    {
      id: 5,
      createdBy: "Mike Chen",
      Title: "Title 5",
      description: "The Best Open Source Organization",
    },
  ];

  return (
    <div className="publication-container">
      <h2 className="publication-heading">Popular Publications</h2>
      <table className="publication-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created By</th>
            <th>Title</th>
            <th>Description</th>
            <th>Show Detail</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication) => (
            <tr key={publication.id}>
              <td>{publication.id}</td>
              <td>{publication.createdBy}</td>
              <td>{publication.Title}</td>
              <td>{publication.description}</td>
              <td><button className="TableButton">Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClosedDisputes;