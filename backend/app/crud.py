from sqlalchemy.orm import Session
from . import models, schemas, security
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_username(db: Session, username: str) -> models.User:
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str) -> models.User:
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_note(db: Session, note: schemas.NoteCreate, user_id: int) -> models.Note:
    db_note = models.Note(**note.dict(), owner_id=user_id)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_notes(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Note).filter(models.Note.owner_id == user_id).offset(skip).limit(limit).all()

def get_note_by_id(db: Session, note_id: int, user_id: int) -> models.Note:
    return db.query(models.Note).filter(models.Note.id == note_id, models.Note.owner_id == user_id).first()

def update_note(db: Session, note_id: int, note: schemas.NoteUpdate, user_id: int) -> models.Note:
    db_note = get_note_by_id(db, note_id, user_id)
    if db_note:
        for key, value in note.dict(exclude_unset=True).items():
            setattr(db_note, key, value)
        db.commit()
        db.refresh(db_note)
    return db_note

def delete_note(db: Session, note_id: int, user_id: int) -> models.Note:
    db_note = get_note_by_id(db, note_id, user_id)
    if db_note:
        db.delete(db_note)
        db.commit()
    return db_note
