import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={(props) => <SliceZone {...props} components={components} />}
  />
);

export default SliceSimulatorPage;

export const getStaticProps = async () => {
  if (process.env.NODE_ENV === "production") {
    return { notFound: true };
  } else {
    return { props: {} };
  }
};
