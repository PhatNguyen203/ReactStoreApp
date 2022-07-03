import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h5" gutterBottom>
            Server Error
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "Internal server error in Production Env"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
}
