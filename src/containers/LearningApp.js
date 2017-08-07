import React, { Component } from 'react';
import CommonUtils from '../utils/commonUtils';

class LearningApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: new Date().getFullYear()};
  }

  getAllIntergerInArray(mangSoNguyen){
    document.write("Danh sach cac so nguyen le: ");
    for (var index = 0; index < mangSoNguyen.length; index++) {
      var element = mangSoNguyen[index];
      if(element%2 != 0){
        document.write( element + ",");
      }
    }
  }

  xuatKetQuaPhuongTrinhBacHai(a, b, c){
    let nghiem = CommonUtils.giaiPhuongTrinhBacHai(a, b, c);
    if(nghiem.length == 0){
      document.write("Phuong trinh vo nghiem");
    }
    else if(nghiem.length == 1){
      document.write("Phuong trinh co 2 nghiem trung nhau");
      document.write("<br>x1=x2=" + nghiem[0].toFixed(2));
    }
    else if(nghiem.length == 2){
      document.write("Phuong trinh co 2 nghiem phan biet");
      document.write("<br>x1=" + nghiem[0].toFixed(2));
      document.write("<br>x2=" + nghiem[1].toFixed(2));
    }
  }

  timThu6Ngay13TrongNam(nam){
    //Khai bao bien ngay kq
    let kq = [];
    //Duyet tu vong th lap tu 1 den 12 va dieu kien kq == ngay 1/1/1
    for (var index = 0; index < 12; index++) {
      //Ngay = ngay 13 thang th nam nm
      let date = new Date(nam, index, 13);

      //Neu ngay la thu 6 -> gan kq = ngay vua tim thay -> xuat ngay ngay ra man hinh
      if(date.getDay() == 5){
        kq.push(CommonUtils.jpDateFormat(nam, index, 13));
      }
    }  
    return kq;  
  }

  handleChange(e) {
    this.setState({text: e.target.value});    
  }

  render() {
    var kq = this.timThu6Ngay13TrongNam(this.state.text);
    var list = [];
    for (var i = 0; i < kq.length; i++) {
      list.push(<div>{kq[i]}</div>);
    }
    return (
      <div>
        <h3>Nhập vào một năm, tìm tất cả các ngày thứ 6 ngày 13 trong năm đó:</h3>
        <input onChange={this.handleChange} value={this.state.text} />
        <div>{list}</div>
      </div>
    );
  }
}

export default LearningApp;
