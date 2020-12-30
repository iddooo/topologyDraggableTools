// 图形库
import { register as registerFlow } from '@topology/flow-diagram';
import { register as registerActivity } from '@topology/activity-diagram';
import { register as registerClass } from '@topology/class-diagram';
import { register as registerSequence } from '@topology/sequence-diagram';
import { register as registerChart } from '@topology/chart-diagram';

// 注册图形库
export function canvasRegister() {
  // 流程图
  registerFlow()
  // 活动图
  registerActivity()
  // 时序图
  registerSequence()
  // 类图
  registerClass()
  // 图表控件
  registerChart()
}
