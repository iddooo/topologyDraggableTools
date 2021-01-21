export const fns = {
  // 修改属性
  editAttr(pen, params) {
    params.forEach(v => {
      pen[v[key]] = v[value];
    });
    console.log("修改属性", pen, params);
    let pens = [pen];
    window.topology.updateProps(false, pens);
  },
  radioRed(pen, params) {
    // 根据状态改变背景颜色
    let stateOff = {
      image: "/static/images/radio-red-up.png"
    };

    let stateOn = {
      image: "/static/images/radio-red-down.png"
    };
    console.log("red", pen, params);

    // test
    if (pen.name == "image") {
      pen.image = pen.image == stateOff.image ? stateOn.image : stateOff.image;
    }
    if (pen.children) {
      pen.children.forEach(n => {
        if (n.name == "image") {
          n.image = n.image == stateOff.image ? stateOn.image : stateOff.image;
        }
      });
    }
    let pens = [pen];
    window.topology.updateProps(false, pens);
  },
  radioGreen(pen, params) {
    // 根据状态改变背景颜色
    let stateOff = {
      image: "/static/images/radio-green-up.png"
    };

    let stateOn = {
      image: "/static/images/radio-green-down.png"
    };
    console.log("green", pen, params);
    pen.children.forEach(c => {
      if (c.name == "image") {
        c.image = c.image == stateOff.image ? stateOn.image : stateOff.image;
        let pens = [pen];
        window.topology.updateProps(false, pens);
      }
    });
  },
//   电机状态(启动) 1
  buttonStateON(pen, params) {
    // 启动状态
    let stateOff = {
      image: "/static/images/btn1.png",
      color: "#25D9FF"
    };

    let stateOn = {
      image: "/static/images/btn1-on.png",
      color: "#FFE719"
    };
    console.log("启动/停止状态", pen, params);
    let value = params[0].value;
    let state = {};
    if (value == 0) {
      state = stateOff;
    } else {
      state = stateOn;
    }
    if (pen.name == "image") {
      pen.image = state.image;
    }
    if (pen.name == "text") {
      pen.font.color = state.color;
    }
    if (pen.children) {
      pen.children.forEach(n => {
        if (n.name == "image") {
          n.image = state.image;
        }
        if (n.name == "text") {
          n.font.color = state.color;
        }
      });
    }
    let pens = [pen];
    window.topology.updateProps(false, pens);
  },
//  "电机状态(停止)" 0
  buttonStateOFF(pen, params) {
    // 启动状态
    let stateOff = {
      image: "/static/images/btn1.png",
      color: "#25D9FF"
    };

    let stateOn = {
      image: "/static/images/btn1-on.png",
      color: "#FFE719"
    };
    console.log("启动/停止状态", pen, params);
    let value = params[0].value;
    let state = {};
    if (value == 0) {
      state = stateOn;
    } else {
      state = stateOff;
    }
    if (pen.name == "image") {
      pen.image = state.image;
    }
    if (pen.name == "text") {
      pen.font.color = state.color;
    }
    if (pen.children) {
      pen.children.forEach(n => {
        if (n.name == "image") {
          n.image = state.image;
        }
        if (n.name == "text") {
          n.font.color = state.color;
        }
      });
    }
    let pens = [pen];
    window.topology.updateProps(false, pens);
  },
  // 路由跳转
  link(pen, params) {
    console.log("路由跳转", pen, params);
  },
  animate(pen,params){
    topology.data.pens.forEach((e)=>{
        console.log(e)
        if(e.animateType){
            e.animateStart = Date.now();    
        }
    })
    topology.animate();
  }
};
