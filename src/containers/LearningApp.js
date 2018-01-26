import React, { Component } from 'react';
import CommonUtils from '../utils/commonUtils';
import JSCoding from '../utils/JSCoding';

class LearningApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: new Date().getFullYear()};      
  }

  jsCoding(){
    var test = new JSCoding();
    test.apply();
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

  cacNgayLeVietNam(nam){
    //Khai bao bien ngay kq
    let kq = [];
    //Tết Dương Lịch
    kq.push(CommonUtils.jpDateFormat(nam, 0, 1));
    //Ngày Giải phóng miền Nam, Thống nhất đất nước
    kq.push(CommonUtils.jpDateFormat(nam, 3, 30));
    //Ngày Quốc tế Lao động
    kq.push(CommonUtils.jpDateFormat(nam, 4, 1));
    //Ngày Quốc khánh    
    kq.push(CommonUtils.jpDateFormat(nam, 8, 2));
    
    return kq;  
  }

  showList(inList){
    var outList = [];
    for (var i = 0; i < inList.length; i++) {
      outList.push(<div key={i}>{inList[i]}</div>);
    }
    return outList;
  }

  handleChange(e) {
    this.setState({text: e.target.value});    
  }

  render() {
    this.jsCoding();
    var kq = this.timThu6Ngay13TrongNam(this.state.text);
    var thu6Ngay13List = this.showList(kq);
    kq = this.cacNgayLeVietNam(this.state.text);
    var cacNgayLeList = this.showList(kq);
    return (
      <div>
        {/* <h3>Nhập vào một năm:</h3>
        <input onChange={this.handleChange} value={this.state.text} />
        <br/>
        <br/>
        <div>Các ngày thứ 6 ngày 13 trong năm: {this.state.text}</div>
        <div>{thu6Ngay13List}</div>
        <br/>
        <div>Các ngày lễ Việt Nam trong năm: {this.state.text}</div>
        <div>{cacNgayLeList}</div> */}
      </div>
    );
  }
}

export default LearningApp;
