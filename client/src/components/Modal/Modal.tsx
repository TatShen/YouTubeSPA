import React, { useState } from "react";
import style from "./Modal.module.css";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Col,
  InputNumber,
  Row,
  Slider,
} from "antd";
import { IRequest } from "../../redux/actions/userAction";
import { userApi } from "../../services/User.service";

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 0, span: 1 },
};
interface IModalProps {
  searchValue: string;
  setIsModalActive: (arg: boolean) => void;
}

export const Modal: React.FC<IModalProps> = ({
  searchValue,
  setIsModalActive,
}) => {
  const [, setNameOfRequest] = useState("");
  const [limit, setLimit] = useState(25);
  const [form] = Form.useForm();

  const handlerSort = (value: string) => {
    switch (value) {
      case "date":
        form.setFieldsValue({ note: "date" });
        break;
      case "rating":
        form.setFieldsValue({ note: "rating" });
        break;
      case "title ":
        form.setFieldsValue({ note: "title" });
        break;
      default:
        form.setFieldsValue({ note: null });
    }
  };

  const onChange = (newValue: number | null) => {
    if (newValue) {
      setLimit(newValue);
    }
  };

  const onFinish = async (values: IRequest) => {
    values.sort = values.sort || null;
    values.limit = limit;
    const data = await userApi.addRequest(values);
    if (data) {
      setIsModalActive(false);
    }
  };

  const onReset = () => {
    setIsModalActive(false);
  };

  return (
    <div className={style.mask}>
      <div className={style.modal}>
        <h1 className={style.title}>Сохранить запрос</h1>
        <Form
          form={form}
          onFinish={onFinish}
          name="layout-multiple-vertical"
          layout="vertical"
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 50 }}
          size="large"
          className={style.form}
        >
          <Form.Item name="request" label="Запрос" initialValue={searchValue}>
            <Input readOnly={true} disabled={true} />
          </Form.Item>
          <Form.Item label="Название" name="name" rules={[{ required: true }]}>
            <Input
              placeholder="Укажите название"
              onChange={(e) => setNameOfRequest(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="sort"
            label="Сортировать по"
            rules={[{ required: false }]}
          >
            <Select
              placeholder="Без сортировки"
              onChange={handlerSort}
              allowClear
              className={style.select}
            >
              <Option value="date">По дате публикации</Option>
              <Option value="rating">По популярности</Option>
              <Option value="title">По алфавиту</Option>
            </Select>
          </Form.Item>
          <Form.Item name="limit">
            <Row>
              <Col span={18}>
                <Slider
                  min={1}
                  max={50}
                  onChange={onChange}
                  value={typeof limit === "number" ? limit : 0}
                />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={1}
                  max={50}
                  style={{
                    margin: "0 16px",
                  }}
                  value={limit}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button
                htmlType="button"
                color="primary"
                variant="outlined"
                onClick={onReset}
                className={style.button}
              >
                Не сохранять
              </Button>
              <Button type="primary" htmlType="submit" className={style.button}>
                Сохранить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
