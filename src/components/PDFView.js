import React, { useState, useEffect, useCallback } from "react";
// @ts-ignore
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import TranslationQuote from "./TranslationQuote.tsx";
import { useSlotProps } from "@mui/base";

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#e4e4e4",
    textTransform: "uppercase",
    fontFamily: "Oswald",
  },
  body: {
    flexGrow: 1,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
  },
  block: {
    flexGrow: 1,
  },
  text: {
    width: "60%",
    margin: 10,
    fontFamily: "Oswald",
    textAlign: "justify",
  },
  fill1: {
    width: "40%",
    backgroundColor: "#e14427",
  },
  fill2: {
    flexGrow: 2,
    backgroundColor: "#e6672d",
  },
  fill3: {
    flexGrow: 2,
    backgroundColor: "#e78632",
  },
  fill4: {
    flexGrow: 2,
    backgroundColor: "#e29e37",
  },
});

const PDFView = (props, finalQuote, client) => {
  const [pdfDetails, setPdfDetails] = useState();

  const handleClick = (client) => {
    let x = client;

    setPdfDetails(x);
    console.log("coming from comp", x);

    // useEffect(() => {
    //   if (clientName) {
    //     let x = clientName;

    //     setPdfDetails(x);

    //   }
    // });
  };
  console.log(client);
  return (
    <>
      <Document>
        <Page>
          <View>
            <Text render={({ finalQuote, client }) => `See ${client}`} fixed>
              {" "}
              {client}
              Testing{" "}
            </Text>
          </View>
        </Page>
      </Document>
      <button onClick={handleClick}></button>
    </>
  );
};

export default PDFView;
