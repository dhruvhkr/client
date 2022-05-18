import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import axios from "../api/axios";
import { Button, Table } from "semantic-ui-react";
import getPolicyById from "../api/api";
import RedirectModal from "./RedirectModal";

function Policy() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    getPolicyById(`/policy/search?id=${id}`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setPolicy(res.data.policy[0]);
        if (res.data.policy.length === 0) {
          navigate("/redirect");
        }
      }
    });
  }, [id]);

  return (
    <div>
      <Header edit={true} id={id} />
      {policy && (
        <Table color="blue" celled style={{ paddingTop: "100px" }} inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                Policy_Field
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Policy_Value
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(policy).map((item, i) => {
              if (item !== "_id") {
                return (
                  <Table.Row key={item}>
                    <Table.Cell textAlign="center">{item}</Table.Cell>
                    <Table.Cell textAlign="center">{policy[item]}</Table.Cell>
                  </Table.Row>
                );
              }
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default Policy;
