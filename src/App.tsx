import { Layout, Menu, Typography } from "antd";
import { useState, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RouteAnalytics from "./RouteAnalytics";
import PromptLab from "./pages/PromptLab";
import HackathonDetailsPage from "./pages/HackathonDetailsPage";
import SandboxEditor from "./pages/SandboxEditor";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    const k = location.pathname.split("/")[1] || "home";
    return k;
  });

  const items = useMemo(
    () => [
      { key: "home", label: "Home" },
      { key: "promptlab", label: "PromptLab" },
      { key: "hackathon", label: "Hackathon" },
      { key: "editor", label: "Sandbox Editor" }
    ],
    []
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <RouteAnalytics />
      <Header style={{ background: "white", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Title level={4} style={{ margin: 0 }}>AI Sandbox + GA4 POC</Title>
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[selectedKey]}
            onClick={(e) => {
              setSelectedKey(e.key);
              navigate(e.key === "home" ? "/" : `/${e.key}`);
            }}
          />
        </div>
      </Header>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={
              <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
                <Title level={3}>Welcome</Title>
                <Text type="secondary">
                  This POC mirrors your Ant Design look & feel and sends GA4 page views,
                  feature events, and engagement time. Set <code>VITE_GA_MEASUREMENT_ID</code>
                  to auto-init GA (or just keep it blank to run UI-only).
                </Text>
              </div>
            } />
            <Route path="/promptlab" element={<PromptLab />} />
            <Route path="/hackathon" element={<HackathonDetailsPage />} />
            <Route path="/editor" element={<SandboxEditor />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}
