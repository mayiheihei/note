package cn.tedu.note.service;


import cn.tedu.note.entity.Note;

import java.util.List;
import java.util.Map;

public interface NoteService {

    List<Map<String, Object>> listNotes(String notebookId) throws NotebookNotFoundException;

    Map<String, Object> loadNote(String noteId) throws NoteNotFoundException;

    boolean updateNote(String noteId, String title, String body) throws NoteNotFoundException;

    //@Transactional TODO 思考下加接口还是加到实现类上
    int deleteNotes(String... ids);

    List<Map<String, Object>> listNotes(String notebookId, int page) throws NotebookNotFoundException;

    Note saveNote(String userId, String notebookId, String title);
}
