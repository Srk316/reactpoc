import { Card, Menu, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { gaEvent } from "../analytics";
import { useFeatureTimer } from "../hooks/useFeatureTimer";

const { Title, Text } = Typography;
type Tab = "general" | "teams" | "submissions" | "results" | "winners";

export default function HackathonDetailsPage() {
  useFeatureTimer("HackathonDetails");
  const [tab, setTab] = useState<Tab>("general");

  useEffect(() => {
    gaEvent("feature_used", {
      feature_name: "HackathonDetails",
      action: "view_tab",
      tab
    });
  }, [tab]);

  const items = useMemo(
    () => [
      { key: "general", label: "General Info" },
      { key: "teams", label: "Teams" },
      { key: "submissions", label: "Submissions" },
      { key: "results", label: "Results" },
      { key: "winners", label: "Winners" }
    ],
    []
  );

  return (
    <Card title={<Title level={4} style={{ margin: 0 }}>Hackathon</Title>} bordered>
      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={[tab]}
        onClick={(e) => {
          setTab(e.key as Tab);
          gaEvent("feature_used", {
            feature_name: "HackathonDetails",
            action: "switch_tab",
            tab: e.key
          });
        }}
        style={{ marginBottom: 16 }}
      />
      <Card>
        <Text type="secondary">Active tab: {tab}</Text>
        {tab === "submissions" && (
          <div style={{ marginTop: 12 }}>
            <a
              onClick={() =>
                gaEvent("feature_used", {
                  feature_name: "HackathonDetails",
                  action: "submit_entry"
                })
              }
            >
              Submit a dummy entry
            </a>
          </div>
        )}
      </Card>
    </Card>
  );
}
