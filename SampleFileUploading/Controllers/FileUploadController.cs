using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleFileUploading.Controllers
{
    public class FileUploadController : Controller
    {
        //
        // GET: /FileUpload/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UploadImageFiles()
        {

            foreach (string file in Request.Files)
            {
                HttpPostedFileBase hpf = Request.Files[file] as HttpPostedFileBase;
                if (hpf.ContentLength == 0)
                    continue;
                string savedFileName = Path.Combine(Server.MapPath("~/Upload/Image"), Path.GetFileName(hpf.FileName));
                hpf.SaveAs(savedFileName);
            }
            return Json(true);
        }
	}
}