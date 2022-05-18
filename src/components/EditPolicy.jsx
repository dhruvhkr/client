import axios from "../api/axios";
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Form, Input, Select } from "semantic-ui-react";
import InfoModal from "./InfoModal";
import reducer from "../reducer/policy.reducer";
import Header from "./Header";
import getPolicyById from "../api/api";

function EditPolicy() {
  const { id } = useParams();
  const [error, setError] = useState([]);
  const [state, dispatch] = useReducer(reducer, {});
  const [open, setOpen] = useState(false);

  const options = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
  ];
  useEffect(() => {
    getPolicyById(`/policy/search?id=${id}`, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        dispatch({
          type: "initialState",
          payload: res.data.policy[0],
        });
      }
    });
  }, [id]);
  const updatePolicy = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/api/policy/update", state)
      .then((res) => {
        setOpen(true);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  return (
    <div style={{ display: "grid", placeItems: "center", paddingTop: "100px" }}>
      <InfoModal open={open} setOpen={setOpen} />
      <Header />
      <Form size="massive">
        <h1 style={{ textAlign: "center", color: "purple" }}>Edit Policy</h1>
        <Divider />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Policy_id"
            placeholder="Policy_id"
            value={state?.Policy_id}
            error={error && error.Policy_id}
            onChange={(e) =>
              dispatch({ type: "policy_id", payload: e.target.value })
            }
            required
          />
          <Form.Field
            control={Input}
            label="Customer_id"
            placeholder="Customer_id"
            value={state?.Customer_id}
            error={error && error.Customer_id}
            onChange={(e) =>
              dispatch({ type: "customer_id", payload: e.target.value })
            }
            required
          />
          <Form.Field
            control={Input}
            label="Fuel"
            placeholder="Fuel"
            value={state?.Fuel}
            error={error && error.Fuel}
            onChange={(e) =>
              dispatch({ type: "Fuel", payload: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="VEHICLE_SEGMENT"
            placeholder="VEHICLE_SEGMENT"
            value={state?.VEHICLE_SEGMENT}
            error={error && error.VEHICLE_SEGMENT}
            onChange={(e) =>
              dispatch({ type: "VEHICLE_SEGMENT", payload: e.target.value })
            }
            required
          />
          <Form.Field
            control={Input}
            label="Premium"
            placeholder="Premium"
            value={state?.Premium}
            error={error && error.Premium}
            type="number"
            onChange={(e) =>
              dispatch({ type: "Premium", payload: e.target.value })
            }
            required
          />
          <Form.Field
            control={Input}
            label="bodily_injury_liability"
            placeholder="bodily_injury_liability"
            value={state?.bodily_injury_liability}
            error={error && error.bodily_injury_liability}
            onChange={(e) =>
              dispatch({
                type: "bodily_injury_liability",
                payload: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="personal_injury_protection"
            placeholder="personal_injury_protection"
            value={state?.personal_injury_protection}
            error={error && error.personal_injury_protection}
            onChange={(e) =>
              dispatch({
                type: "personal_injury_protection",
                payload: e.target.value,
              })
            }
            required
          />
          <Form.Field
            control={Input}
            label="property_damage_liability"
            placeholder="property_damage_liability"
            value={state?.property_damage_liability}
            error={error && error.property_damage_liability}
            type="number"
            onChange={(e) =>
              dispatch({
                type: "property_damage_liability",
                payload: e.target.value,
              })
            }
            required
          />
          <Form.Field
            control={Input}
            label="collision"
            placeholder="collision"
            value={state?.collision}
            error={error && error.collision}
            onChange={(e) =>
              dispatch({
                type: "collision",
                payload: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="comprehensive"
            placeholder="comprehensive"
            value={state?.comprehensive}
            error={error && error.comprehensive}
            onChange={(e) =>
              dispatch({
                type: "comprehensive",
                payload: e.target.value,
              })
            }
            required
          />
          <Form.Select
            label="Customer_Gender"
            placeholder="Customer_Gender"
            value={state?.Customer_Gender}
            error={error && error.Customer_Gender}
            options={options}
            onChange={(e) =>
              dispatch({
                type: "Customer_Gender",
                payload: e.target.innerText,
              })
            }
            required
          />
          <Form.Field
            control={Input}
            label="Customer_Income_group"
            placeholder="Customer_Income_group"
            value={state?.Customer_Income_group}
            error={error && error.Customer_Income_group}
            onChange={(e) =>
              dispatch({
                type: "Customer_Income_group",
                payload: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Customer_Region"
            placeholder="Customer_Region"
            value={state?.Customer_Region}
            error={error && error.Customer_Region}
            onChange={(e) =>
              dispatch({
                type: "Customer_Region",
                payload: e.target.value,
              })
            }
            required
          />
          <Form.Field
            control={Input}
            label="Customer_Marital_status"
            placeholder="Customer_Marital_status"
            value={state?.Customer_Marital_status}
            error={error && error.Customer_Marital_status}
            onChange={(e) =>
              dispatch({
                type: "Customer_Marital_status",
                payload: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Divider />
        <Button onClick={updatePolicy} primary type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditPolicy;
