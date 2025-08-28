import { Card, Input, Row, Col, Button, Typography, Pagination, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { gaEvent } from "../analytics";
import { useFeatureTimer } from "../hooks/useFeatureTimer";

const { Title, Text } = Typography;

export default function PromptLab() {
  useFeatureTimer("PromptLibrary");

  const [q, setQ] = useState("");                 // <-- keep
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState<string | undefined>(); // <-- keep

  const debouncedQuery = useDebounce(q, 400);

  useEffect(() => {
    if (debouncedQuery !== "") {
      gaEvent("feature_used", {
        feature_name: "PromptLibrary",
        action: "search",
        query_length: debouncedQuery.length,
        has_query: true,
      });
    }
  }, [debouncedQuery]);

  const data = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, title: `Template ${i + 1}` }));

  return (
    <Card title={<Title level={4} style={{ margin: 0 }}>Prompt Library</Title>} bordered>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} md={12}>
          <Input.Search
            placeholder="Search prompts"
            allowClear
            value={q}                              {/* <-- use q */}
            onChange={(e) => {
              setQ(e.target.value);                {/* <-- sets q */}
              setPage(1);
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Select
            allowClear
            placeholder="Select category"
            value={cat}                             {/* <-- use cat */}
            onChange={(v) => {
              setCat(v);                           {/* <-- sets cat */}
              gaEvent("feature_used", {
                feature_name: "PromptLibrary",
                action: "filter_category",
                category_id: v ?? "all",
              });
              setPage(1);
            }}
            options={[
              { value: "all", label: "All" },
              { value: "genai", label: "GenAI" },
              { value: "nlp", label: "NLP" },
            ]}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      {/* ...rest unchanged... */}
    </Card>
  );
}
