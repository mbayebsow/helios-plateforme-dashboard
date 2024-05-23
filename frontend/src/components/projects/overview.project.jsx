import { Avatar, Button, Card, Descriptions, Divider, Grid, Link, Progress, Space, Statistic, Typography } from "@arco-design/web-react";
import { Send } from "@carbon/icons-react";
import ReactApexChart from "react-apexcharts";
import Moment from "react-moment";

export default function OverviewProject({ data }) {
  const areastate = {
    series: [
      {
        name: "Heures enregistrées",
        data: [
          {
            x: new Date("2018-02-13").getTime(),
            y: 76,
          },
          {
            x: new Date("2018-02-14").getTime(),
            y: 46,
          },
          {
            x: new Date("2018-02-15").getTime(),
            y: 86,
          },
          {
            x: new Date("2018-02-16").getTime(),
            y: 16,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        //labels: {
        //  formatter: function (val) {
        //    return (val / 1000000).toFixed(0);
        //  },
        //},
        title: {
          text: "Heures",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val + " h";
          },
        },
      },
    },
  };

  const state = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["A faire", "Complet", "En cour", "Abandonner", "Suspendu"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div style={{ width: "100%", marginBottom: 30 }}>
        <Descriptions
          data={[
            {
              label: "Creer le",
              value: <Moment date={data.created_at} format="DD/MM/YYYY" />,
            },
            {
              label: "Dernier modification",
              value: <Moment date={data.updated_at} format="DD/MM/YYYY" />,
            },
            {
              label: "Creer par",
              value: data.created_by.first_name + " " + data.project_admin.last_name,
            },
            {
              label: "Chef de projet",
              value: data.project_admin.first_name + " " + data.project_admin.last_name,
            },
          ]}
          layout="inline-vertical"
          border
          column={4}
        />
      </div>
      <div style={{ width: "100%", display: "flex", gap: 20, marginBottom: 30 }}>
        <Card hoverable style={{ width: "100%" }} title="Progression du projet" extra={<Link>Voir plus</Link>}>
          <Space size="large" style={{ width: "100%" }}>
            <Progress type="circle" steps={5} percent={10} />
            <Space size="large">
              <div>
                <div>Start Date</div>
                <div>
                  <Moment format="DD/MM/YYYY" date={data.start_date} />
                </div>
              </div>
              <div>
                <div>Deadline</div>
                <div>{data.deadline ? <Moment format="DD/MM/YYYY" date={data.deadline} /> : "- - -"}</div>
              </div>
            </Space>
          </Space>
        </Card>
        <Card hoverable style={{ width: "100%" }} title="Details du cient" extra={<Link>Voir plus</Link>}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <Avatar size={50}>
                <img src={data.client_id.profile} alt="avatar" />
              </Avatar>
              <div>
                <div>{data.client_id.full_name}</div>
                <div>{data.client_id.phone ? data.client_id.indicatif + data.client_id.phone : <div style={{ fontSize: 10 }}>{data.client_id.email}</div>}</div>
                <div>{data.client_id?.company_name}</div>
              </div>
            </Space>

            <Button>
              <Send /> Message
            </Button>
          </div>
        </Card>
      </div>

      <div style={{ width: "100%", display: "flex", gap: 20, marginBottom: 30 }}>
        <Card hoverable style={{ width: "100%" }} title="Statistics nombres d'heures cumulées enregistrées" extra={<Link>Voir plus</Link>}>
          <ReactApexChart options={areastate.options} series={areastate.series} type="area" height={250} />
        </Card>
      </div>

      <div style={{ width: "100%", display: "flex", gap: 20, marginBottom: 30 }}>
        <Card hoverable style={{ width: "100%" }} title="Statistics" extra={<Link>Voir plus</Link>}>
          <ReactApexChart options={state.options} series={state.series} type="pie" />
        </Card>
        <Card hoverable style={{ width: "100%" }} title="Statistics" extra={<Link>Voir plus</Link>}>
          <Grid.Row>
            <Grid.Col span={12}>
              <Statistic title="Budget du projet" value={data.project_budget + " FCFA"} groupSeparator />
            </Grid.Col>
            <Grid.Col span={12}>
              <Statistic title="Depenses" value="0 FCFA" groupSeparator />
            </Grid.Col>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Col span={12}>
              <Statistic title="Totla heures" value="0 h" groupSeparator />
            </Grid.Col>
            <Grid.Col span={12}></Grid.Col>
          </Grid.Row>
        </Card>
      </div>
      <div>
        <Typography.Title heading={6}>Details du projet</Typography.Title>
        <Typography.Paragraph>{data.project_summary}</Typography.Paragraph>
      </div>
    </div>
  );
}
