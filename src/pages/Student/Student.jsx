import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Alert, Button, Card, message} from "antd";
import service from "../../services/index";
import {transformTime} from "../../utils/time";

const Student = () => {
    const [data, setData] = useState([]);

    const getStudent = () => {
        service("getMyStudents", {}).then(res => {
            if (res.code === 0) {
                setData(res.data);
            }
        });
    };

    const submit = id => {
        service("review", {studentIds: [id]}).then(res => {
            if (res.code === 0) {
                message.info("该学生已通过审核");
                getStudent();
            }
        });
    };

    useEffect(() => {
        getStudent();
    }, []);

    return (
        <div className="student">
            <Alert
                message="新学生选择您为老师后需要您的审核才能做题哦，点击下方按钮通过审核吧～"
                type="info"
                style={{marginBottom: "20px"}}
            />
            <Card>
                {data.map(({student}) => (
                    <Card.Grid
                        key={student.id}
                        style={{textAlign: "center", width: "25%"}}
                    >
                        <div style={{marginBottom: "10px"}}>ID：{student.id}</div>
                        <div style={{marginBottom: "10px"}}>姓名：{student.name}</div>
                        <div style={{marginBottom: "10px"}}>
                            申请时间：{transformTime(student.createdAt)}
                        </div>
                        <Button type="primary" onClick={() => submit(student.id)}>
                            通过审核
                        </Button>
                    </Card.Grid>
                ))}
            </Card>
        </div>
    );
};

export default withRouter(Student);
