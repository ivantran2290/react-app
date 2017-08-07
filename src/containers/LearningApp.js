import React, { Component } from 'react';
import CommonUtils from '../utils/commonUtils';

class LearningApp extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        <h3>Programming Learning</h3>
        <div>{this.getAllIntergerInArray([1,0,-1,2,5,6,-4])}</div>
      </div>
    );
  }
}

export default LearningApp;
