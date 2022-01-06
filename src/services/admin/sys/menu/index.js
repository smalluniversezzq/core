import { request, METHOD } from '@/utils/request'
import { loadRoutes, createdRoutesFromData } from "@/utils/routerUtil";

const apiList = {
  AdminSysMenuIndex: '/admin/sys/menu/index', // 平台端菜单
}
/**
 * 获取平台端菜单
 * 内部逻辑包括更新本地相关存储
 */
export function getAdminSysMenuIndex() {
  return new Promise((resolve, reject)=>{
    request({
      url: apiList.AdminSysMenuIndex,
      method: METHOD.GET,
    }).then(res => {
      if (res.code == 200) {
        let someRoutes = createdRoutesFromData(res.data);
        let routesConfig = [
          {
            router: "CorePlatformRouter",
            children: someRoutes
          }
        ];
        loadRoutes(
          { router: window.vueObj.$router, store:  window.vueObj.$store, i18n:  window.vueObj.$i18n },
          routesConfig
        );
        // 计算出第一个末位菜单
        const firstPath = getFirstPath(someRoutes[0]);
        // 保存，以供回到首页使用
        localStorage.setItem("firstPath", firstPath);
        localStorage.setItem('uPmid', JSON.parse(localStorage.getItem('platformInfo')).pmid)
        resolve(firstPath)
      }
    }).catch(err=>{
      reject(err)
    })
  })
}


function getFirstPath(oneRoute, routeLevel=0) {
  let path;
  if (routeLevel==0) {
    path = "/corePlatform/";
  } else {
    path = "/";
  }
  if (!oneRoute.children || oneRoute.children.length == 0) {
    path += oneRoute.path;
  } else {
    path = path + oneRoute.path + this.getFirstPath(oneRoute.children[0], routeLevel+1);
  }
  return path;
}