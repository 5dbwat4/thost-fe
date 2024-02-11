const fs = require("fs");
const path = require("path");

const nodeModulesPath = path.resolve(__dirname, "./node_modules");


let opc=''

function Rec0(e){
  opc=opc+'\n'+e
}
// 遍历文件夹下的所有包
function traversePackages(folderPath, pkgpref) {
  const packages = fs.readdirSync(folderPath);

  packages.forEach((packageName) => {
    const packagePath = path.join(folderPath, packageName);
    if (packageName.startsWith(".")) {
      return;
    }
    if (packageName.startsWith("@")) {
      traversePackages(packagePath, packageName);
      return;
    }

    // 检查是否是文件夹
    if (fs.statSync(packagePath).isDirectory()) {
      const licensePath = path.join(packagePath, "LICENSE");

      try {
        // 读取 LICENSE 文件内容
        const licenseContent = fs.readFileSync(licensePath, "utf8");
        if (pkgpref) {
          Rec0(`Package: ${pkgpref}/${packageName}`);
        } else {
          Rec0(`Package: ${packageName}`);
        }
        Rec0(`LICENSE:\n${licenseContent}`);
        Rec0("--------------------------------------");
      } catch (error) {
        // LICENSE 文件不存在或读取失败
        const licensePath = path.join(packagePath, "LICENSE.md");

        try {
          // 读取 LICENSE.md 文件内容
          const licenseContent = fs.readFileSync(licensePath, "utf8");
          if (pkgpref) {
            Rec0(`Package: ${pkgpref}/${packageName}`);
          } else {
            Rec0(`Package: ${packageName}`);
          }
          Rec0(`LICENSE:\n${licenseContent}`);
          Rec0("--------------------------------------");
        } catch (error) {
          if (pkgpref) {
            Rec0(`Package: ${pkgpref}/${packageName}`);
          } else {
            Rec0(`Package: ${packageName}`);
          }
          Rec0("No LICENSE file found.");
          Rec0("--------------------------------------");
        }
      }

      // 继续遍历下一层文件夹
      //   traversePackages(packagePath);
    }
  });
}

// 执行遍历函数
traversePackages(nodeModulesPath);


fs.writeFileSync("licenseGeneratedString.json",JSON.stringify({
  data:opc
}))