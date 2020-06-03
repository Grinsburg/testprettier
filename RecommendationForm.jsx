import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import classNames from 'classnames';

import { Button, Spin, Input, Form, Select, Tooltip, Row, Col } from 'antd';

import routes from '../../modules/navigation/routes';
import { LOCATIONS } from './RecommdendationForm.constants';
import { submitRecommendationForm } from '../../modules/redux/recommendationForm/recommendationForm.actions';
import {
  submitRecomendationFormIsLoading,
  getAllDivisions,
} from '../../modules/redux/recommendationForm/recommendationForm.selectors';
import { createRecommendationSchema, initialValues } from '../../schemas/';

import styles from './RecommendationForm.module.scss';
import { QuestionCircleOutlined } from '@ant-design/icons';

export class RecommendationForm extends React.Component {
  render() {
    const {
      isLoading,
      divisions,
      submitRecommendationForm,
      history,
    } = this.props;
    const { TextArea } = Input;

    if (isLoading) {
      return <Spin size='large' />;
    }

    return (
      <Formik
        onSubmit={(value) => {
          const contacts = {
            firstName: value.firstName,
            lastName: value.lastName,
            feedback: value.feedback,
            divisionId: value.division.value,
            location: value.location.value,
            linkedin: value.LinkedIn,
            email: value.Email,
            phone: value.Phone,
          };
          return submitRecommendationForm(contacts).then(() => {
            history.push(routes.recommendations);
          });
        }}
        initialValues={initialValues}
        validationSchema={createRecommendationSchema}
      >
        {({ errors, touched }) => (
          <Form layout='vertical' size='large' style={{ width: '100%' }}>
            <Row justify='center'>
              <Col span={18}>
                <Row>
                  <Col span={24} style={{ marginTop: '3rem' }}>
                    <Row justify='space-between'>
                      <Col span={10}>
                        <Form.Item
                          label='First Name'
                          name='firstName'
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please input your first name!',
                            },
                          ]}
                        >
                          <Input placeholder='First Name' />
                        </Form.Item>
                        <Form.Item
                          label='Last Name'
                          name='lastName'
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please input your last name!',
                            },
                          ]}
                        >
                          <Input placeholder='Last Name' />
                        </Form.Item>
                        <Form.Item
                          label='Division'
                          name='division'
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please choose the division!',
                            },
                          ]}
                        >
                          <Select
                            placeholder='Choose the division'
                            options={divisions}
                          ></Select>
                        </Form.Item>
                        <Form.Item
                          label='Location'
                          name='location'
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please choose the location!',
                            },
                          ]}
                        >
                          <Select
                            placeholder='Choose the location'
                            options={LOCATIONS}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label='Email'
                          name='email'
                          rules={[
                            {
                              required: false,
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                          ]}
                        >
                          <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item
                          label='Linkedin'
                          name='linkedin'
                          rules={[
                            {
                              required: false,
                              message: 'Please enter valid Linkedin!',
                            },
                          ]}
                        >
                          <Input placeholder='Linkedin' />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span>
                              Phone&nbsp;
                              <Tooltip title='Example: 375295555555'>
                                <QuestionCircleOutlined />
                              </Tooltip>
                            </span>
                          }
                          name='phone'
                          rules={[
                            {
                              max: 12,
                              message: `Max length 12 letters`,
                            },
                            {
                              min: 12,
                              message: `Min length 12 letters`,
                            },
                          ]}
                        >
                          <Input placeholder='Phone' />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label='Feedback'
                      name='feedback'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your feedback',
                        },
                      ]}
                    >
                      <TextArea autoSize={{ minRows: 12, maxRows: 12 }} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row justify='space-between'>
                      <Col span={3}>
                        <Form.Item>
                          <Button
                            data-test='cancel'
                            onClick={() => {
                              history.push(routes.recommendations);
                            }}
                            type='primary'
                            className={classNames(styles.button)}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item>
                          <Button
                            data-test='submit'
                            type='primary'
                            htmlType='submit'
                            className={classNames(styles.button)}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: submitRecomendationFormIsLoading(state),
    divisions: getAllDivisions(state),
  };
};

RecommendationForm.propTypes = {
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  submitRecommendationForm: PropTypes.func,
  divisions: PropTypes.array,
};

export default withRouter(
  connect(mapStateToProps, { submitRecommendationForm })(RecommendationForm)
);
