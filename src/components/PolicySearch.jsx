import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Dimmer,
  Icon,
  Loader,
  Menu,
  Pagination,
  Table,
} from "semantic-ui-react";
import Header from "./Header";
import moment from "moment";
import getPolicyById from "../api/api";
import RedirectModal from "./RedirectModal";

function PolicySearch() {
  const location = useLocation();
  const value = location?.state?.value;
  const count = location?.state?.count;

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPolicyById(`/policy/search?id=${value}&limit=10&page=1`, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setPolicies(res.data.policy);
        console.log(value);
        console.log(res.data.policy);
        if (res.data.policy.length === 0) {
          navigate("/redirect");
        }
      }
      setLoading(false);
    });
  }, [value, count]);

  const handlePagination = (e, { activePage }) => {
    setLoading(true);
    getPolicyById(
      `http://localhost:4000/api/policy/search?id=${value}&limit=${10}&page=${activePage}`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setPolicies(res.data.policy);
        }
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Header />
      {policies && (
        <Table color="blue" celled style={{ paddingTop: "100px" }} inverted>
          <Dimmer active={loading}>
            <Loader />
          </Dimmer>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Policy_id</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Customer_id
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Date_of_Purchase
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Premium</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                View or Edit
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {policies.map((policy, i) => (
              <Table.Row celled key={policy._id}>
                <Table.Cell textAlign="center">{policy.Policy_id}</Table.Cell>
                <Table.Cell textAlign="center">{policy.Customer_id}</Table.Cell>
                <Table.Cell textAlign="center">
                  {moment.utc(policy.Date_of_Purchase).format("MM/DD/YYYY")}
                </Table.Cell>
                <Table.Cell textAlign="center">{policy.Premium}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button.Group>
                    <Button
                      color="purple"
                      onClick={() => navigate(`/policy/${policy.Policy_id}`)}
                    >
                      View
                    </Button>
                    <Button.Or />
                    <Button
                      positive
                      onClick={() =>
                        navigate(`/policy/${policy.Policy_id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Menu
        fluid
        fixed="bottom"
        color="purple"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Menu.Item>
          <Pagination
            defaultActivePage={1}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            onPageChange={handlePagination}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true,
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true,
            }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={Math.ceil(count / 10)}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default PolicySearch;
