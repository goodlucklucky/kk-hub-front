import React from "react";

declare global {
  namespace JSX {
    interface Element extends React.ReactElement {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
