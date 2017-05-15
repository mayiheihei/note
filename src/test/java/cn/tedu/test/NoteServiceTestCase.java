package cn.tedu.test;

import cn.tedu.note.service.NoteService;
import org.junit.Before;
import org.junit.Test;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class NoteServiceTestCase extends BaseTestCase {

	NoteService service;

	@Before
	public void initService() {
		this.service = ctx.getBean("noteService", NoteService.class);
	}

	@Test
	public void testListNotes() {
		String notebookId = "6d763ac9-dca3-42d7-a2a7-a08053095c08";
		List<Map<String, Object>> list = service.listNotes(notebookId);
		for (Map<String, Object> map : list) {
			System.out.println(map);
		}
	}

	@Test
	public void testLoadNote() {
		String noteId = "09f60aeb-a573-4fcf-b39f-903e1536e762";
		Map<String, Object> map = service.loadNote(noteId);
		Iterator<Entry<String, Object>> it = map.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Object> entry = it.next();
			System.out.println("key:" + entry.getKey());
			System.out.println("value:" + entry.getValue());
		}
	}

	//
	@Test
	public void teestUpdateNote(){
		String noteId="";
		String title = "";
		String body="";
		boolean b = service.updateNote(noteId,title,body);
		System.out.println(b);

	}

	@Test
	public void testDeleteNotes(){
		String id1="183ddc33-f00c-4275-bc8b-c35bd6a65369";
		String id2="123123123";
		/*String id3="433423";
		String id4="23324234";*/
		//String... 变长参数，编译过后，是new String[]{id1,di2,id3,id4};
		//String... 当方法中有多个参数，只能放最后一个参数，而且只能有一个，不能有第二个
		int n = service.deleteNotes(id1,id2);
	}

	@Test
	public void testSaveNote(){

		//service.saveNote(userId,notebookId,title);
	}
}
