package com.mario.demo.service;

import com.mario.demo.domain.Book;
import com.mario.demo.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Book.
 */
@Service
@Transactional
public class BookService {

    private final Logger log = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Save a book.
     *
     * @param book the entity to save
     * @return the persisted entity
     */
    public Book save(Book book) {
        log.debug("Request to save Book : {}", book);
        return bookRepository.save(book);
    }

    /**
     * Get all the books.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Book> findAll(Pageable pageable) {
        log.debug("Request to get all Books");
        return bookRepository.findAll(pageable);
    }

    /**
     * Get one book by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Book findOne(Long id) {
        log.debug("Request to get Book : {}", id);
        return bookRepository.findOne(id);
    }

    /**
     * Delete the book by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Book : {}", id);
        bookRepository.delete(id);
    }
}
