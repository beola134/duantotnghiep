'use client'
import styles from "./thongke.module.css";
import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from 'classnames/bind';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const cx = classNames.bind(styles);


export default function AdminStatistics() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const chartOptions1 = {
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  const chartOptions2 = {
    series: [
      {
        name: 'Q1 Budget',
        group: 'budget',
        data: [44000, 55000, 41000, 67000, 22000, 43000]
      },
      {
        name: 'Q1 Actual',
        group: 'actual',
        data: [48000, 50000, 40000, 65000, 25000, 40000]
      },
      {
        name: 'Q2 Budget',
        group: 'budget',
        data: [13000, 36000, 20000, 8000, 13000, 27000]
      },
      {
        name: 'Q2 Actual',
        group: 'actual',
        data: [20000, 40000, 25000, 10000, 12000, 28000]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    dataLabels: {
      formatter: (val) => {
        return val / 1000 + 'K';
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: [
        'Online advertising',
        'Sales Training',
        'Print advertising',
        'Catalogs',
        'Meetings',
        'Public relations'
      ]
    },
    fill: {
      opacity: 1
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    yaxis: {
      labels: {
        formatter: (val) => {
          return val / 1000 + 'K';
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };




  //fect dữ liệu
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [donHangs, setDonhangs] = useState([]);
  const [tongDoanhThu, setTongDoanhThu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/thongke/getTotalProducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.getTotalProducts); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/thongke/getTotalProductsCount"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductsCount(data.totalProductsCount);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/thongke/getTotalCategories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.totalCategories); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/thongke/getTotalUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.totalUsers); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/thongke/getTotalDonHang');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDonhangs(data.totalOrders); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/thongke/getTotalRevenue');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTongDoanhThu(data.doanhThu); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    fetchData();
  }, []); 



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main id={cx("content")}>
      <ul className={cx("box-info")}>
        <li>
          <i
            className={cx("bx", " bxl-product-hunt", "bx bxl-product-hunt")}
          ></i>
          <span className={cx("text")}>
            <h3>{products}</h3>
            <p>Sản Phẩm</p>
          </span>
        </li>
        <li>
          <i className={cx("bx bx-cube", "bx")}></i>
          <span className={cx("text")}>
            <h3>{productsCount}</h3>
            <p>Số Lượng Sản Phẩm</p>
          </span>
        </li>
        <li>
          <i className={cx("bx", "bx bxs-category")}></i>
          <span className={cx("text")}>
            <h3>{categories}</h3>
            <p>Danh mục</p>
          </span>
        </li>
      </ul>
      <ul className={cx("box-info1")}>
        <li>
          <i className={cx("bx", "bx bx-list-ul")}></i>
          <span className={cx("text")}>
            <h3>{donHangs}</h3>
            <p>Đơn Hàng</p>
          </span>
        </li>
        <li>
          <i className={cx("bx", "bx bxs-group")}></i>
          <span className={cx("text")}>
            <h3>{users}</h3>
            <p>Người Dùng</p>
          </span>
        </li>
        <li>
          <i className={cx("bx", "bx bxs-dollar-circle")}></i>
          <span className={cx("text")}>
            <h3>
              {tongDoanhThu ? tongDoanhThu.toLocaleString("vi-VN") : "0"}₫
            </h3>
            <p>Tổng Doanh Thu</p>
          </span>
        </li>
      </ul>
      <div className={cx("data")}>
        <div className={cx("content-data")}>
          <div className={cx("head")}>
            <h3>Dữ liệu đầu vào tháng 6</h3>
            <div className={cx("menu", "dropdown")}>
              <i
                className="bx bx-dots-horizontal-rounded icon"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul
                className={cx("dropdown-menu", "dropdown-menu-end")}
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Edit
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Save
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx("chart")}>
            <div id="chart1">
              <ReactApexChart
                options={chartOptions1}
                series={chartOptions1.series}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className={cx("content-data")}>
          <div className={cx("head")}>
            <h3>Trạng Thái Đơn Hàng</h3>
            <div className={cx("menu", "dropdown")}>
              <i
                className="bx bx-dots-horizontal-rounded icon"
                id={cx("dropdownMenuButton")}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Edit
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Save
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx("chat-box")}>
            <div id="chart">
              <ReactApexChart
                options={chartOptions2}
                series={chartOptions2.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className={cx("content-data")}>
          <div className={cx("head")}>
            <h3>User</h3>
            <div className={cx("menu", "dropdown")}>
              <i
                className={`bx bx-dots-horizontal-rounded ${cx("icon")}`}
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Edit
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Save
                  </a>
                </li>
                <li>
                  <a className={cx("dropdown-item")} href="#">
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx("chat-box")}>
            <table className={cx("customer-table")}>
              <thead className={cx("cuttom1")}>
                <tr>
                  <th style={{ width: "20%" }}>ID</th>
                  <th>Tên khách hàng</th>
                  <th>Ngày sinh</th>
                  <th>Số điện thoại</th>
                </tr>
              </thead>
              <tbody>
                {/* Lặp dữ liệu ví dụ */}
                {Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index}>
                    <td>#183</td>
                    <td>Hột vịt muối</td>
                    <td>21/7/1992</td>
                    <td>0921387221</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={cx("content-data")}>
          <div className={cx("head")}>
            <h3>Trạng Thái Đơn Hàng</h3>
            <div className={`${cx("menu")} dropdown`}>
              <i
                className={`bx bx-dots-horizontal-rounded ${cx("icon")}`}
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Edit
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Save
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx("chat-box")}>
            <div className={cx("table-container")}>
              <table className={cx("customer-table")}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx("user-info")}>
                        <img
                          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          alt="User Image"
                        />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className={`${cx("status", "completed")}`}>
                        Hoàn Thành
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
