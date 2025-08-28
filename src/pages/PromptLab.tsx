import { Card, Input, Row, Col, Button, Typography, Pagination, Select } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { gaEvent } from "../analytics";
import { useFeatureTimer } from "../hooks/useFeatureTimer";

const { Title, Text } = Typography;

export default function PromptLab() {
  useFeatureTimer("PromptLibrary");

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState<string | undefined>(undefined);

  // simple debounce without lodash
  const debounceTimer = useRef<number | undefined>(undefined);
  const onSearchChange = (value: string) => {
    setQ(value);
    setPage(1);
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => {
      if (value !== "") {
        gaEvent("feature_used", {
          feature_name: "PromptLibrary",
          action: "search",
          query_length: value.length,
          has_query: true,
        });
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, []);

  const data = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ id: i + 1, title: `Template ${i + 1}` })),
    []
  );

  return (
    <Card title={<Title level={4} style={{ margin: 0 }}>Prompt Library</Title>} bordered>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} md={12}>
          <Input.Search
            placeholder="Search prompts"
            allowClear
            value={q}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Select
            allowClear
            placeholder="Select category"
            value={cat}
            onChange={(v) => {
              setCat(v);
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

      <Row gutter={[12, 12]}>
        {data.map((item) => (
          <Col xs={12} md={8} key={item.id}>
            <Card
              hoverable
              onClick={() =>
                gaEvent("feature_used", {
                  feature_name: "PromptLibrary",
                  action: "open_prompt_details",
                  prompt_id: item.id,
                })
              }
            >
              <Text>{item.title}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination
          current={page}
          total={120}
          pageSize={12}
          onChange={(p, size) => {
            setPage(p);
            gaEvent("feature_used", {
              feature_name: "PromptLibrary",
              action: "paginate",
              page: p,
              page_size: size,
            });
          }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Button
          onClick={() =>
            gaEvent("feature_complete", {
              feature_name: "PromptLibrary",
              result: "success",
            })
          }
        >
          Complete Flow
        </Button>
      </div>
    </Card>
  );
}
