import React from "react";
import "./CheatSheet.css";
import { Tabs } from "antd";
import TableCheatSheet from "./TableCheatSheet/TableCheatSheet";
import CheatSheetThemes from "./CheatSheetThemes/CheatSheetThemes";

class CheatSheet extends React.Component {
  render() {
    const { TabPane } = Tabs;

    return (
      <Tabs type="card">
        <TabPane tab="Cheat sheet" key="1">
          <TableCheatSheet />
        </TabPane>
        <TabPane tab="Themes of cheat sheet " key="2">
          <CheatSheetThemes />
        </TabPane>
      </Tabs>
    );
  }
}

export default CheatSheet;
