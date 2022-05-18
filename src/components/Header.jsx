import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, Search } from "semantic-ui-react";
import _ from "lodash";
import axios from "../api/axios";
import getPolicyById from "../api/api";

function Header({ edit, id }) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [count, setCount] = useState([]);
  const [seachedStr, setSearchedStr] = useState("");

  const handleSearchChange = (e) => {
    getPolicyById(`policy/search?id=${e.target.value}`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setSearchedStr(e.target.value);
        const tempResult = res.data.policy.map((policy) => ({
          title: `${policy.Policy_id}`,
          description: `Policy_Id`,
          price: `Customer_Id - ${policy.Customer_id}`,
        }));
        setCount(res.data.count);
        if (res.data.count > tempResult.length) {
          tempResult.push({
            title: "Show More",
            className: "showMore",
          });
        }
        setResults(tempResult);
      }
    });
  };

  const handleResultSelect = (e, { result }) => {
    const text = result.title;
    if (e.target.innerText === "Show More") {
      navigate("/search", {
        state: {
          count,
          value: seachedStr,
        },
      });
    } else {
      navigate(`/policy/${text}`);
    }
  };

  return (
    <Menu fluid fixed="top" color="purple" size="large" inverted>
      <Menu.Item onClick={() => navigate("/")}>Insurance</Menu.Item>

      <Menu.Item>
        <Search
          input={{ icon: "search", iconPosition: "left" }}
          placeholder="Customer Id or Policy Id"
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
        />
      </Menu.Item>
      {edit && (
        <Menu.Item position="right">
          <Button positive onClick={() => navigate(`/policy/${id}/edit`)}>
            Edit Policy
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Header;
