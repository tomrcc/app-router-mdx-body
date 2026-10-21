import { EditableRegions } from "@cloudcannon/editable-regions/react";
import CloudCannonEditor from "./components/CloudCannonEditor";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EditableRegions tag="div">
          <main>{children}</main>
        </EditableRegions>
        <CloudCannonEditor />
      </body>
    </html>
  );
}
