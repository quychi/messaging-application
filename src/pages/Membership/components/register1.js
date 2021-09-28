import React from 'react';
import { Col, Form, DatePicker, Select } from 'antd';
// import { ReactComponent as UserSvg } from '../../../common/images/user.svg';
// import { ReactComponent as PhoneSvg } from '../../../common/images/phone.svg';
// import { ReactComponent as AddressSvg } from '../../../common/images/address.svg';
// import { ReactComponent as EmailImgSvg } from '../../../common/images/email.svg';
// import { ReactComponent as ShieldUserSvg } from '../../../common/images/shieldUser.svg';
// import { ReactComponent as EyeOpenSvg } from '../../../common/images/eyeOpen.svg';
// import { ReactComponent as EyeCloseSvg } from '../../../common/images/eyeClose.svg';
import { FooterButtonWrapper } from '../styled';
import ButtonComponent from '../../../common/components/Button';
import InputComponent from '../../../common/components/WelcomeInput';
import SelectComponent from '../../../common/components/WelcomeSelect';

const Register1 = () => {
    return (
        <div>
            <Col md={12} xs={24} align="start" justify="space-between">
                <Form
                    // form={sendForm}
                    name="sendForm"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    requiredMark={false}
                    validateMessages={{ required: 'test' }}
                >
                    <Form.Item
                        name={`Nickname`}
                        initialValue=""
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <InputComponent
                            placeholder={'Nickname'}
                            // prefix={<UserSvg />}
                            type="text"
                            // suffix={unitsData[i.unit] || ""}
                        />
                    </Form.Item>
                    <Form.Item
                        name={`dob`}
                        initialValue=""
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <DatePicker
                            style={{ width: '100%', 'border-radius': '20px' }}
                            format="DD/MM/YYYY"
                            placeholder="Select date of birth"
                        />
                    </Form.Item>

                    <Form.Item
                        name="activity_area"
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <SelectComponent
                            // onChange={(value) => {
                            //   if (value === "point_of_sale")
                            //     setIsShowPostTypeInput(true);
                            //   else setIsShowPostTypeInput(false);
                            //   sendForm.setFieldsValue({ cost_type: "free" });
                            // }}
                            placeholder={'Gender'}
                        >
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                        </SelectComponent>
                    </Form.Item>
                </Form>

                <FooterButtonWrapper>
                    <ButtonComponent
                        onClick={() => {
                            // setIsShowModalThanks(false);
                            // setIsShowNearByPosts(false);
                            // onCancel();
                            // setPostImgs([]);
                        }}
                    >
                        Enter
                    </ButtonComponent>
                </FooterButtonWrapper>
            </Col>
        </div>
    );
};
export default Register1;
