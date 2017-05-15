package cn.tedu.note.web;

import cn.tedu.note.entity.Note;
import cn.tedu.note.service.NoteService;
import cn.tedu.note.util.JsonResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/note")
public class NoteController extends BaseController {

    @Resource
    private NoteService noteService;

    @RequestMapping("/list.do")
    @ResponseBody
    public JsonResult<List<Map<String, Object>>> list(String notebookId) {
        List<Map<String, Object>> list = noteService.listNotes(notebookId);
        return new JsonResult<List<Map<String, Object>>>(list);
    }

    @RequestMapping("/load.do")
    @ResponseBody
    public JsonResult<Map<String, Object>> myLoad(String noteId) {
        Map<String, Object> myMap = noteService.loadNote(noteId);
        return new JsonResult<Map<String, Object>>(myMap);
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public JsonResult<Boolean> myUpdate(String noteId, String title, String body) {
        boolean b = noteService.updateNote(noteId, title, body);
        return new JsonResult<Boolean>(b);
    }

    @RequestMapping("/add.do")
    @ResponseBody
    public JsonResult<Note> addNote(String userId,String notebookId,String title){
    Note note = noteService.saveNote(userId,notebookId,title);
    return new JsonResult<Note>(note);
    }
}
