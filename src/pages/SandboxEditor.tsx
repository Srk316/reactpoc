import { Card, Button, Typography, Input } from "antd";
import { useState } from "react";
import { gaEvent } from "../analytics";
import { useFeatureTimer } from "../hooks/useFeatureTimer";

const { Title } = Typography;

export default function SandboxEditor() {
  useFeatureTimer("ReplitEditor");
  const [code, setCode] = useState("print('hello world')\n");

  return (
    <Card title={<Title level={4} style={{ margin: 0 }}>Sandbox Editor</Title>} bordered>
      <Input.TextArea
        value={code}
        rows={10}
        onChange={(e) => setCode(e.target.value)}
        onBlur={() => gaEvent("feature_used", { feature_name: "ReplitEditor", action: "edit_code" })}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Button onClick={() => gaEvent("feature_used", { feature_name: "ReplitEditor", action: "run_code" })}>
          Run
        </Button>
        <Button onClick={() => gaEvent("feature_complete", { feature_name: "ReplitEditor", result: "saved" })}>
          Save
        </Button>
      </div>
    </Card>
  );
}
