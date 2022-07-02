import * as React from "react";
import ReactJson from "react-json-view";
import axios from "axios";
import { Spin, Modal } from "antd";

interface State {
  loading: boolean;
  dataValues: any;
}

class GameValues extends React.Component<{}, State> {
  public state = {
    loading: true,
    dataValues: {}
  };

  public componentDidMount() {
    this.fetch();
  }

  public render() {
    if (this.state.loading) {
      return <Spin />;
    }
    return (
      <div style={{ padding: 25, background: "#171b87" }}>
        <ReactJson
          src={this.state.dataValues}
          theme="monokai"
          onAdd={() => this.onChange}
          onEdit={this.onChange}
          onDelete={this.onChange}
          onSelect={() => true}
        />
      </div>
    );
  }

  public onChange = async (options: { updated_src: any }) => {
    try {
      await axios.post("/blueXint-panel/gameValues", options.updated_src);
    } catch (e) {
      Modal.error({ title: "Game Values couldn't be saved." });
    }
  };

  public fetch = async () => {
    this.setState({ loading: true });
    try {
      const data = (await axios.get("/blueXin-panel/gameValues")).data;
      this.setState({ dataValues: data });
    } catch (e) {
      Modal.error({ title: "fetching game values had a problem" });
    } finally {
      this.setState({ loading: false });
    }
  };
}

export default GameValues;
