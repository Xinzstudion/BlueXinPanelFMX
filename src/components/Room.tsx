import * as React from "react";
import axios from "axios";
import { Modal, Table, Spin } from "antd";
import ReactJson from "react-json-view";

interface Props {
  roomId: string;
}

interface State {
  room: any;
  loading: boolean;
}

class Room extends React.Component<Props, State> {
  props: any;
  setState(arg0: { room: any }) {
    throw new Error("Method not implemented.");
  }
  public state = { room: null as any, loading: true };
  public fetcher: any;

  public componentDidMount() {
    this.fetch();
    this.fetcher = setInterval(() => this.fetch(true), 7000);
  }

  public componentWillUnmount() {
    if (this.fetcher) {
      clearInterval(this.fetcher);
    }
  }

  public render() {
    if (this.state.loading) {
      return <Spin />;
    }
    return (
      <div style={{ padding: 10 }}>
        <b style={{ fontSize: 40, marginBottom: 7 }}>{this.props.roomId}</b>
        <Table
          dataSource={this.state.room.clients}
          columns={[
            { title: "ID", dataIndex: "id", key: "client-id" },
            { title: "Session", dataIndex: "sessionId", key: "client-session" }
          ]}
        />
        <ReactJson src={this.state.room.state} theme="monokai" />
      </div>
    );
  }

  public fetch = async (noLoading?: boolean) => {
    try {
      if (!noLoading) {
        this.setState({ loading: true });
      }
      const room = (
        await axios.get("/blueXin-panel/rooms/" + this.props.roomId)
      ).data;
      this.setState({ room });
    } catch (e) {
      Modal.error({ title: "Room Fecthing Problem!" });
    } finally {
      this.setState({ loading: false });
    }
  };
}

export default Room;
